
export const getData = async () => {
    let URI = 'http://localhost:8080/api/movies/trending'

    let data = await fetch(URI)

    let result = data.json()

    console.log("Data FETCHED:", result)
    return result
}

export const getCategories = async () => {
    let URI = 'http://localhost:8080/api/categories'

    let data = await fetch(URI)

    let result = data.json()

    console.log(result)
    return result
}

export const getDataAll = async (category) => {


    let path;
    if (typeof category === 'object' && category.path) {
        path = category.path;
    } else if (typeof category === 'string') {
        path = category;
    } else {
        throw new Error("O parâmetro category deve ser um objeto com a propriedade 'path' ou uma string.");
    }

    
    const data = await fetch(`http://localhost:8080/api/movies?path=${encodeURIComponent(path)}`)
    .then(response => response.json());

    
    return data
}
