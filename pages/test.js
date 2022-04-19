function Test() {
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