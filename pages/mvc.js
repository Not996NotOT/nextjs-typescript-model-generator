import { makeAutoObservable } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import styles from "./index.module.scss";

class CodeController {
  commonName;
  iApiName;
  apiName;
  IApiCode;
  apiCode;
  iServiceName;
  serviceName;
  iServiceCode;
  serviceCode;
  iControllerName;
  controllerName;
  iControllerCode;
  controllerCode;
  iModelItemDTO;
  modelItemDTO;
  iListModelDTOName;
  listModelDTOName;
  iDetailModelDTOName;
  detailModelDTOName;
  constructor() {
    makeAutoObservable(this);
  }

  convertCode = () => {
    this.convertIApiCode();
    this.convertApiCode();
    this.convertIServiceCode();
    this.convertServiceCode();
    this.convertIControllerCode();
    this.convertControllerCode();
  };

  changeCommonName(value) {
    this.commonName = value;
    this.iApiName = `I${this.commonName}Api`;
    this.apiName = `${this.commonName}Api`;
    this.iServiceName = `I${this.commonName}Service`;
    this.serviceName = `${this.commonName}Service`;
    this.iControllerName = `I${this.commonName}Controller`;
    this.controllerName = `${this.commonName}Controller`;
    this.iListModelDTOName = `I${this.commonName}ItemDTO`;
    this.listModelDTOName = `${this.commonName}ItemDTO`;
    this.iDetailModelDTOName = `I${this.commonName}ItemDTO`;
    this.detailModelDTOName = `${this.commonName}ItemDTO`;
  }

  convertIApiCode() {
    let str = `import { IPagination } from "../models/base/IPaginationT";
${
  this.iListModelDTOName
    ? `import { ${this.iListModelDTOName} } from "../models/dto/${this.iListModelDTOName}";`
    : ""
}
${
  this.iDetailModelDTOName &&
  this.iDetailModelDTOName !== this.iListModelDTOName
    ? `import { ${this.iDetailModelDTOName} } from "../models/dto/${this.iDetailModelDTOName}";`
    : ""
}
import { IPaginationParams } from "../models/param/IPaginationParams";

export interface ${this.iApiName} {
${
  this.iListModelDTOName &&
  `/**
* @description getList
*/
getList(params: IPaginationParams): Promise<IPagination<${this.iListModelDTOName}>>;`
}

${
  this.iDetailModelDTOName &&
  `/**
  * @description getDetail
  */
 getDetail(params: { id: string }): Promise<${this.iDetailModelDTOName}>;`
}
}`;
    this.IApiCode = str;
  }

  convertApiCode() {
    let str = `import { AbsBaseApi } from "../infrastructure/abstract/api/BaseApi";
import { ${this.iApiName} } from "../interface/api/${this.iApiName}";
import { IPagination } from "../interface/models/base/IPaginationT";
${
  this.iListModelDTOName &&
  `import { ${this.iListModelDTOName} } from "../interface/models/dto/${this.iListModelDTOName}";`
}
${
  this.iDetailModelDTOName &&
  this.iDetailModelDTOName !== this.iListModelDTOName
    ? `import { ${this.iDetailModelDTOName} } from "../interface/models/dto/${this.iDetailModelDTOName}";`
    : ""
}
import { IPaginationParams } from "../interface/models/param/IPaginationParams";
      
enum ${this.apiName}Enum {
${this.iListModelDTOName && `    GetList = "getlist",`}
${this.iDetailModelDTOName && `    GetDetail = "getdetail",`}
}
      
export class ${this.apiName} extends AbsBaseApi implements ${this.iApiName} {
        constructor() {
          super();
        }
      
    ${
      this.iListModelDTOName &&
      `async getList(params: IPaginationParams): Promise<IPagination<${this.iListModelDTOName}>> {
            const data = await this.axios.post(${this.apiName}Enum.GetList, params);
            return data;
          }`
    }
      
    ${
      this.iDetailModelDTOName &&
      `async getDetail(params: { id: string }): Promise<${this.iDetailModelDTOName}> {
            const data = await this.axios.post(${this.apiName}Enum.GetDetail, params);
            return data;
      }`
    }
}`;
    this.apiCode = str;
  }

  convertIServiceCode() {
    let str = `import { IPagination } from "../models/base/IPaginationT";
${
  this.iListModelDTOName &&
  `import { ${this.iListModelDTOName} } from "../models/dto/${this.iListModelDTOName}";`
}
${
  this.iDetailModelDTOName &&
  this.iDetailModelDTOName !== this.iListModelDTOName
    ? `import { ${this.iDetailModelDTOName} } from "../models/dto/${this.iDetailModelDTOName}";`
    : ""
}
import { IPaginationParams } from "../models/param/IPaginationParams";

export interface ${this.iServiceName} {
${
  this.iListModelDTOName &&
  `
  /**
   * @description getList
   */
  getList(params: IPaginationParams): Promise<IPagination<${this.iListModelDTOName}>>;
`
}
${
  this.iDetailModelDTOName &&
  `/**
   * @description getDetail
   */
  getDetail(params: { id: string }): Promise<${this.iDetailModelDTOName}>;`
}
}`;
    this.iServiceCode = str;
  }
  convertServiceCode() {
    let str = `import { ${this.apiName} } from "../api/${this.apiName}";
import { AbsBaseService } from "../infrastructure/abstract/services/BaseService";
import { ${this.iApiName} } from "../interface/api/${this.iApiName}";
import { IPagination } from "../interface/models/base/IPaginationT";
${
  this.iListModelDTOName &&
  `import { ${this.listModelDTOName} } from "../models/dto/${this.listModelDTOName}";`
}
${
  this.iDetailModelDTOName &&
  this.iDetailModelDTOName !== this.iListModelDTOName
    ? `import { ${this.iDetailModelDTOName} } from "../models/dto/${this.iDetailModelDTOName}";`
    : ""
}
import { IPaginationParams } from "../interface/models/param/IPaginationParams";
import { ${this.iServiceName} } from "../interface/services/${
      this.iServiceName
    }";
import { Pagination } from "../models/base/PaginationT";
import { List } from "linqts";

export class ${this.serviceName} extends AbsBaseService implements ${
      this.iServiceName
    } {
  api: ${this.iApiName};
  constructor() {
    super();
    this.api = new ${this.apiName}();
  }
${
  this.iListModelDTOName &&
  `async getList(params: IPaginationParams): Promise<IPagination<${this.iListModelDTOName}>> {
    const data = await this.api.getList(params);
    const page: IPagination<${this.iListModelDTOName}> = new Pagination();
    try {
      page.total = data.total;
      page.rows = data.rows.map((item) => new ${this.listModelDTOName}(item));
    } catch (e) {}
    return page;
  }`
}
${
  this.iDetailModelDTOName &&
  `async getDetail(params: { id: string }): Promise<${this.iDetailModelDTOName}> {
        let dto = new ${this.detailModelDTOName}();
        try {
          dto = new ${this.detailModelDTOName}(await this.api.getDetail({ id: params.id }));
        } catch (e) {}
        return dto;
    }`
}
}`;
    this.serviceCode = str;
  }
  convertIControllerCode() {
    let str = `import { IPagination } from "../models/base/IPaginationT";
${
  this.iListModelDTOName &&
  `import { ${this.iListModelDTOName} } from "../models/dto/${this.iListModelDTOName}";`
}
${
  this.iDetailModelDTOName &&
  this.iDetailModelDTOName !== this.iListModelDTOName
    ? `import { ${this.iDetailModelDTOName} } from "../models/dto/${this.iDetailModelDTOName}";`
    : ""
}

import { IPaginationParams } from "../models/param/IPaginationParams";

/**
 * @description ${this.iControllerName}
 */
export interface ${this.iControllerName} {
${
  this.iListModelDTOName &&
  `/**
   * @description getList
   */
   getList(params: IPaginationParams): Promise<IPagination<${this.iListModelDTOName}>>;`
}
${
  this.detailModelDTOName &&
  `/**
    * @description getDetail
    */
    getDetail(params: { id: string }): Promise<${this.iDetailModelDTOName}>;`
}
}`;
    this.iControllerCode = str;
  }

  convertControllerCode() {
    let str = `import { AbsBaseController } from "../infrastructure/abstract/controllers/BaseController";
import { ${this.iControllerName} } from "../interface/controllers/${
      this.iControllerName
    }";
import { IPagination } from "../interface/models/base/IPaginationT";
${
  this.iListModelDTOName &&
  `import { ${this.iListModelDTOName} } from "../interface/models/dto/${this.iListModelDTOName}";`
}
${
  this.iDetailModelDTOName &&
  this.iDetailModelDTOName !== this.iListModelDTOName
    ? `import { ${this.iDetailModelDTOName} } from "../interface/models/dto/${this.iDetailModelDTOName}";`
    : ""
}
import { IPaginationParams } from "../interface/models/param/IPaginationParams";
import { ${this.iServiceName} } from "../interface/services/${
      this.iServiceName
    }";
import { ${this.serviceName} } from "../services/${this.serviceName}";

export class ${this.controllerName}
  extends AbsBaseController
  implements ${this.iControllerName}
{
  service: ${this.iServiceName};
  constructor() {
    super();
    this.service = new ${this.serviceName}();
  }

${
  this.iListModelDTOName &&
  `async getList(params: IPaginationParams): Promise<IPagination<${this.iListModelDTOName}>> {
        return await this.service.getList(params);
   }`
}

${
  this.iDetailModelDTOName &&
  `async getDetail(params: { id: string }): Promise<${this.iDetailModelDTOName}> {
    return await this.service.getDetail(params);
  }`
}
}`;
    this.controllerCode = str;
  }
}

const CodeView = observer(() => {
  const controller = useLocalObservable(() => new CodeController());
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <span>通用名称</span>
        <input
          value={controller.commonName}
          onChange={(e) => controller.changeCommonName(e.target.value)}
        ></input>
        <span>api接口名称</span>
        <input
          value={controller.iApiName}
          onChange={(e) => (controller.iApiName = e.target.value)}
        ></input>
        <span>api类名称</span>
        <input
          value={controller.apiName}
          onChange={(e) => (controller.apiName = e.target.value)}
        ></input>
        <span>service接口名称</span>
        <input
          value={controller.iServiceName}
          onChange={(e) => (controller.iServiceName = e.target.value)}
        ></input>
        <span>service类名称</span>
        <input
          value={controller.serviceName}
          onChange={(e) => (controller.serviceName = e.target.value)}
        ></input>
        <span>controller接口名称</span>
        <input
          value={controller.iControllerName}
          onChange={(e) => (controller.iControllerName = e.target.value)}
        ></input>
        <span>controller类名称</span>
        <input
          value={controller.controllerName}
          onChange={(e) => (controller.controllerName = e.target.value)}
        ></input>
        <span>列表接口DTO</span>
        <input
          value={controller.iListModelDTOName}
          onChange={(e) => (controller.iListModelDTOName = e.target.value)}
        ></input>
        <span>列表类DTO</span>
        <input
          value={controller.listModelDTOName}
          onChange={(e) => (controller.listModelDTOName = e.target.value)}
        ></input>
        <span>详情接口DTO</span>
        <input
          value={controller.iDetailModelDTOName}
          onChange={(e) => (controller.iDetailModelDTOName = e.target.value)}
        ></input>
        <span>详情类DTO</span>
        <input
          value={controller.detailModelDTOName}
          onChange={(e) => (controller.detailModelDTOName = e.target.value)}
        ></input>
        <button onClick={() => controller.convertCode()}>生成代码</button>
      </div>
      <div className={styles.content}>
        <div className={styles.right}>
          IApi
          <div className={styles.inteface}>
            <textarea value={controller.IApiCode}></textarea>
          </div>
          Api
          <div className={styles.class}>
            <textarea value={controller.apiCode}></textarea>
          </div>
          IService
          <div className={styles.inteface}>
            <textarea value={controller.iServiceCode}></textarea>
          </div>
          Service
          <div className={styles.class}>
            <textarea value={controller.serviceCode}></textarea>
          </div>
          IController
          <div className={styles.inteface}>
            <textarea value={controller.iControllerCode}></textarea>
          </div>
          Controller
          <div className={styles.class}>
            <textarea value={controller.controllerCode}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Home() {
  return <CodeView />;
}
