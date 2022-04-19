import {abc} from '../test'
function Test() {
    const a = new abc({
        skcCode
    })
    return (
        <div>
            Enter
        </div>
    );
}

export async function getStaticProps(ctx){


    return {
        props:{
            data:null
        }
    }
}

export default Test;