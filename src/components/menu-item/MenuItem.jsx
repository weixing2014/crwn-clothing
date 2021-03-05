import react from 'react';
import {withRouter} from 'react-router-dom';
import './MenuItem.styles.scss';

const MenuItem = ({id, title, linkUrl, imageUrl, size, history, match}) => (
    <div
        key={id}
        style={{
            backgroundImage: `url(${imageUrl})`,
        }}
        className={`${size} menu-item`}
        onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
        <div className="content">
            <h1 className="title">{title}</h1>
            <span className="subtitle">shop now</span>
        </div>
    </div>
);

export default withRouter(MenuItem);
