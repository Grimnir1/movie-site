import '../css/Error.css'
function Error({error}) {
    return (
        <div className='error'>
            <p>{error}</p>
        </div>
    )
}
export default Error
