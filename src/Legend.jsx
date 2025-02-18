import PropTypes from 'prop-types';

Legend.propTypes = {
    scale: PropTypes.object,
}

export function Legend( { scale }){
    let legend_text = ["0"];
    const quantiles = scale.quantiles();
    for (let i = 0; i < quantiles.length; i++){
        if(i === 0){
            legend_text[i] = "<" + Math.ceil(quantiles[i]);
        } else {
            legend_text[i] = Math.ceil(quantiles[i-1]) + " - " + Math.ceil(quantiles[i] - 1);
        }
    }
    legend_text[legend_text.length] = "≥" + Math.ceil(quantiles[quantiles.length - 1]);
    
    const entries = scale.range().map( (range, i) =>{
        return (
            <li key={i} className="legend-entry">
                <div className="square" style={{background: range}}></div>
                <p className="legendText">{legend_text[i]}</p>
            </li>)
    });
    return (
        <ol className="legend">
            {entries}
        </ol>
    );
}