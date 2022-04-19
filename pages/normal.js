import { makeAutoObservable } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import styles from "./index.module.scss";

class CodeController {
  className;
  interfaceName;
  jsonCode;
  classCode;
  intefaceCode;
  constructor() {
    makeAutoObservable(this);
  }
  convertJsonToOther() {
    console.log("json", this.jsonCode);
    const jObject = JSON.parse(this.jsonCode);
    console.log("jobject", jObject);
    this.convertToDtsClass(jObject);
    this.convertToClass(jObject);
  }

  convertToDtsClass(jObject) {
    let str = ``;
    str += `export declare class ${this.className}  { \n`;
    let keys = Object.getOwnPropertyNames(jObject);
    if (keys.length > 0) {
      keys.forEach((key) => {
        str += `\t/**\n`;
        str += `\t* @description ${key}\n`;
        str += `\t*/\n`;
        str += `\t${key}:${this.getPropertyType(jObject[key])};\n`;
      });
      str += `\tconstructor(params?: { \n`;
      keys.forEach((key) => {
        str += `\t\t/**\n`;
        str += `\t\t* @description ${key}\n`;
        str += `\t\t*/\n`;
        str += `\t\t${key}?:${this.getPropertyType(jObject[key])};\n`;
      });
      str += `\t})`;
      str += `}`;
      console.log("classCode", this.classCode);
      this.intefaceCode = str;
    }
  }

  convertToClass(jObject) {
    let str = "";
    // let str = `import { AbsBaseDTO } from "../../infrastructure/abstract/models/BaseModel";\n`;
    // str += `import { ${this.interfaceName} } from "../../interface/models/dto/${this.interfaceName}";\n`;
    str += `export class ${this.className}  { \n`;
    let keys = Object.getOwnPropertyNames(jObject);
    if (keys.length > 0) {
      keys.forEach((key) => {
        str += `\t/**\n`;
        str += `\t* @description ${key}\n`;
        str += `\t* @type {${this.getPropertyType(key)}}\n`;
        str += `\t*/\n`;
        str += `\t${key};\n`;
      });
      str += `\tconstructor({ \n`;
      keys.forEach((key) => {
        str += `\t\t${key}=${this.getPropertyDeafaultValue(jObject[key])},\n`;
      });
      str += `\t}={}) { \n`;
      // str += `\t\tsuper();\n`;
      keys.forEach((key) => {
        str += `\t\tthis.${key} = ${key};\n`;
      });
      str += `\t}\n`;
      str += `}`;
      console.log("classCode", this.classCode);
      this.classCode = str;
    }
  }

  getPropertyType(propertyValue) {
    console.log(typeof propertyValue);
    switch (typeof propertyValue) {
      case "boolean":
        return "boolean";
      case "number":
        return "number";
      case "string":
        return "string";
      case "undefined":
        return "undefined";
      case "object":
        return this.getComplexPropertyType(propertyValue);
      default:
        return "undefined";
    }
  }
  getComplexPropertyType(propertyValue) {
    switch (propertyValue) {
      case null:
        return "null";
      default:
        return "undefined";
    }
  }

  getPropertyDeafaultValue(propertyValue) {
    console.log(typeof propertyValue);
    switch (typeof propertyValue) {
      case "boolean":
        return "false";
      case "number":
        return "0";
      case "string":
        return '""';
      case "undefined":
        return "undefined";
      case "object":
        return this.getComplexPropertyDeafaultValue(propertyValue);
      default:
        return "undefined";
    }
  }

  getComplexPropertyDeafaultValue(propertyValue) {
    switch (propertyValue) {
      case null:
        return "null";
      default:
        return "undefined";
    }
  }
}

const CodeView = observer(() => {
  const controller = useLocalObservable(() => new CodeController());
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <span>类名字</span>
        <input
          value={controller.className}
          onChange={(e) => {
            controller.className = e.target.value;
            controller.interfaceName = `${e.target.value}`;
            console.log(controller.interfaceName);
          }}
        ></input>
        <span>d.ts</span>
        <input
          value={controller.interfaceName}
          onChange={(e) => (controller.interfaceName = e.target.value)}
        ></input>
        <button onClick={() => controller.convertJsonToOther()}>
          生成代码
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          json
          <textarea
            onChange={(e) => (controller.jsonCode = e.target.value)}
          ></textarea>
        </div>
        <div className={styles.right}>
          d.ts
          <div className={styles.inteface}>
            <textarea value={controller.intefaceCode}></textarea>
          </div>
          class
          <div className={styles.class}>
            <textarea value={controller.classCode}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Home() {
  return <CodeView />;
}
