/*всю общую логику по запросам на сервер, отрисовкой спинеров вынесли в HOC*/
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import React, {useState, useEffect} from 'react'

const withData = (View) => {
    return (
        (props) => {
            debugger
            const [data, updateData] = useState([])
            const [isError, toggleIsError] = useState(false)
            /*из пропсов получаем тот запрос на сервер, который необходимо сделать родительской
            компоненте, будто книги или герои, вторым аргументом передаем пустой массив,
            чтоб у нас не зациклился запрос*/
            useEffect(() => {
                debugger
                props.getData()
                    .then(data => {
                        updateData(data)
                    })
            },[])
            /*componentDidCatch(error) {
                toggleIsError(true)
            }*/
                if (!data) {
                    return <Spinner/>
                }
                if (isError) {
                    return <ErrorMessage/>
                }
                return (
                    /*передаем в целевую компоненту props которые передала родительская
                    компонента (booksPage например) и добавляем в нее данные, пришедшие
                    с сервера*/
                    <View {...props} data={data}/>
                )
        }
    )
}
export default withData