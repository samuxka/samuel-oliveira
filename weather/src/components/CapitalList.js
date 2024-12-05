import React from 'react';

const CapitalList = ({ capitals }) => {
    return(
        <div className='capital-list'>
            <h2>Capitais</h2>
            <div className='list'>
                <div className='minmax m1'>
                    <p>min</p>
                    <p>max</p>
                </div>
                <div className='minmax m2'>
                    <p>min</p>
                    <p>max</p>
                </div>
                {capitals.map((capital) => (
                    <div key={capital.name} className='capital'>
                        <p className='tempe'>
                            <p>{capital.min}°C</p>
                            <p>{capital.max}°C</p>
                        </p>
                        <h3>{capital.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CapitalList;
