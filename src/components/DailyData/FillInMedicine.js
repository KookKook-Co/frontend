import React, { useState } from 'react';

import styles from './index.module.scss';

export const FillInMedicine = ({
    vaccine,
    setVaccine,
    vitamin,
    setVitamin,
}) => {
    return (
        <form>
            <h6>VACCINE</h6>
            {Object.keys(vaccine).map((eachVaccineType, index) => {
                return (
                    <div key={index} className="form-check">
                        <input
                            className="form-check-input-vaccine"
                            type="checkbox"
                            checked={vaccine[eachVaccineType]}
                            onClick={() =>
                                setVaccine(old => {
                                    return {
                                        ...old,
                                        [eachVaccineType]: !vaccine[
                                            eachVaccineType
                                        ],
                                    };
                                })
                            }
                        />
                        <label className="form-check-label" for="defaultCheck1">
                            {eachVaccineType}
                        </label>
                    </div>
                );
            })}
            <hr className={styles.solid} />
            <h6>VITAMIN</h6>
            {Object.keys(vitamin).map((eachVitaminType, index) => {
                return (
                    <div key={index} className="form-check">
                        <input
                            className="form-check-input-vaccine"
                            type="checkbox"
                            checked={vitamin[eachVitaminType]}
                            onClick={() =>
                                setVitamin(old => {
                                    return {
                                        ...old,
                                        [eachVitaminType]: !vitamin[
                                            eachVitaminType
                                        ],
                                    };
                                })
                            }
                        />
                        <label className="form-check-label" for="defaultCheck1">
                            {eachVitaminType}
                        </label>
                    </div>
                );
            })}
        </form>
    );
};
