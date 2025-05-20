export default async function getData() {
    const url = "https://jsonplaceholder.typicode.com/posts/";

    try{
        const dataApi = await fetch(url)
    
        if(!dataApi.ok){
        throw new Error(`${dataApi.status}`)
        }
        const data = await dataApi.json();
        return data.results;
    } 
    catch(error){
        console.log(error)
    }
    
}