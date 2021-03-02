import React from 'react';
import PropTypes from 'prop-types';

export default function ShoppingCart(props) {
    const {
        className,
        style,
    } = props;
    return (
        <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
            <g fill="none" fillRule="nonzero">
                <path fill="#1DE9B6" d="M33.29 7.38a.602.602 0 0 0-.594.61v4.882h-2.373V7.609a.602.602 0 0 0-.593-.61.602.602 0 0 0-.593.61v5.263h-2.51V7.177a.602.602 0 0 0-.593-.61.602.602 0 0 0-.593.61v5.695h-2.534V6.668a.602.602 0 0 0-.593-.61.602.602 0 0 0-.593.61v6.204h-2.4l-.27-6.707a.611.611 0 0 0-.617-.585.603.603 0 0 0-.569.635l.268 6.657H15.63l-.91-7.367a.598.598 0 0 0-.663-.529.607.607 0 0 0-.513.682l.89 7.214h-2.776L10.01 5.014a.593.593 0 0 0-.705-.468.61.61 0 0 0-.455.725l1.594 7.6H7.662L4.401 1.802A1.798 1.798 0 0 0 3.046.536L.776.07A.59.59 0 0 0 .08.548a.61.61 0 0 0 .465.718l2.269.467a.601.601 0 0 1 .452.421L8.92 21.35l-3.094 5.91c-.3.572-.285 1.248.039 1.807.324.558.895.892 1.528.892h24.71a.602.602 0 0 0 .593-.61.602.602 0 0 0-.593-.61H7.393a.581.581 0 0 1-.51-.298.615.615 0 0 1-.012-.603l3.057-5.839 22.308-1.72c.923-.072 1.647-.874 1.647-1.826V7.99a.602.602 0 0 0-.594-.61zM9.99 20.77l-1.968-6.678H10.7l1.366 6.517-2.077.16zm3.27-.253l-1.346-6.425h2.671l.774 6.263-2.098.162zm3.283-.253l-.762-6.172h2.402l.242 6.027-1.882.145zm5.178-.4l-2.112.163-.24-5.935h2.352v5.772zm3.72-.286l-2.533.195v-5.68h2.533v5.485zm3.696-.286l-2.51.194v-5.394h2.51v5.2zm3.56-.84a.606.606 0 0 1-.55.608l-1.824.141v-5.109h2.373v4.36z" />
                <g fill="#576574" transform="translate(7.124 30.553)">
                    <ellipse cx="1.842" cy="1.846" rx="1.78" ry="1.831" />
                    <ellipse cx="23.199" cy="1.846" rx="1.78" ry="1.831" />
                </g>
                <g fill="#A4A7B5">
                    <path d="M8.966 33.009a.73.73 0 0 1-.71-.599l-.476-2.453h2.373l-.477 2.453a.73.73 0 0 1-.71.599zM30.323 33.009a.73.73 0 0 1-.71-.599l-.476-2.453h2.373l-.477 2.453a.73.73 0 0 1-.71.599z" />
                </g>
                <path fill="#1AD1A3" d="M33.955 7.385L4.97 3.735l.377 1.276L33.81 8.596a.599.599 0 0 0 .66-.531.606.606 0 0 0-.516-.68z" />
            </g>
        </svg>
    );
}

ShoppingCart.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};
ShoppingCart.defaultProps = {
    className: undefined,
    style: undefined,
};