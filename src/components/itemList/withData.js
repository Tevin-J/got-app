/*всю общую логику по запросам на сервер, отрисовкой спинеров вынесли в HOC*/
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import React, {useState, useEffect} from 'react'

const withData = (View) => {
    return (
        (props) => {
            const [data, updateData] = useState([])
            /*из пропсов получаем тот запрос на сервер, который необходимо сделать родительской
            компоненте, будь-то книги или герои, вторым аргументом передаем пустой массив,
            чтоб у нас не зациклился запрос*/
            useEffect(() => {
                props.getData()
                    .then(data => {
                        updateData(data)
                    })
            },[])
            try {
                if (!data) {
                    return <Spinner/>
                }
                return (
                    /*передаем в целевую компоненту props которые передала родительская
                    компонента (booksPage например) и добавляем в нее данные, пришедшие
                    с сервера*/
                    <View {...props} data={data}/>
                )
            } catch (e) {
                return <ErrorMessage/>
            }
        }
    )
}
export default withData