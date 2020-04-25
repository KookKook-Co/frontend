import React from 'react';
import styles from './index.module.scss';

export const FillInMedicine = ({
    vaccine,
    setVaccine,
    vitamin,
    setVitamin,
}) => {
    return (
        <form>
            <h6 className={styles.textTitleModal}>VACCINE</h6>
            {vaccine.map((eachVaccineType, index) => {
                return (
                    <div
                        key={index}
                        className="form-check d-flex align-items-center"
                    >
                        <input
                            className="form-check-input-vaccine"
                            type="checkbox"
                            checked={vaccine[index].isChosen}
                            onChange={() =>
                                setVaccine((old) => {
                                    const after = [...old];
                                    after[index].isChosen = !after[index]
                                        .isChosen;
                                    return after;
                                })
                            }
                        />
                        <label
                            className={`form-check-label ${styles.textMedicineModal}`}
                        >
                            {eachVaccineType.medicineType}
                        </label>
                    </div>
                );
            })}
            <hr className={styles.solid} />
            <h6 className={styles.textTitleModal}>VITAMIN</h6>
            {vitamin.map((eachVitaminType, index) => {
                return (
                    <div
                        key={index}
                        className="form-check d-flex align-items-center"
                    >
                        <input
                            className="form-check-input-vaccine"
                            type="checkbox"
                            checked={vitamin[index].isChosen}
                            onChange={() =>
                                setVitamin((old) => {
                                    const after = [...old];
                                    after[index].isChosen = !after[index]
                                        .isChosen;
                                    return after;
                                })
                            }
                        />
                        <label
                            className={`form-check-label ${styles.textMedicineModal}`}
                        >
                            {eachVitaminType.medicineType}
                        </label>
                    </div>
                );
            })}
        </form>
    );
};
