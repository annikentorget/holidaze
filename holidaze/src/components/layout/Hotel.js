const Hotel = props => {
    const { title, description, image_url, price } = props;
    return (
        <div className='hotel'>
            <h2 className='hotel'>{title}</h2>
            <img className='hotel' src={image_url} alt={title} />
            <h3 className='hotel__price'>{price}</h3>
            <p className='hotel__description'>{description}</p>
        </div>
    );
};

export default Hotel;