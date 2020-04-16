/*всю общую логику по запросам на сервер, отрисовкой спинеров вынесли в HOC*/
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import React from 'react'
import booksPage from "../pages/booksPage/booksPage";

const withData = (View) => {
    return (
        class extends React.Component {
            state = {
                data: null,
                isError: false
            }
            /*из пропсов получаем тот запрос на сервер, который необходимо сделать родительской
            компоненте, будто книги или герои*/
            componentDidMount() {
                this.props.getData()
                    .then(data => {
                        this.setState({data})
                    })
            }
            componentDidCatch(error, errorInfo) {
                this.setState({isError: true})
            }
            render() {
                const {data} = this.state
                if (!data) {
                    return <Spinner/>
                }
                if (this.state.isError) {
                    return <ErrorMessage/>
                }
                return (
                    /*передаем в целевую компоненту props которые передала родительская
                    компонента (booksPage например) и добавляем в нее данные, пришедшие
                    с сервера*/
                    <View {...this.props} data={data}/>
                )
            }
        }
    )
}
export default withData