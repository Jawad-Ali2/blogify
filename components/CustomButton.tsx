'use client';

import { CustomButtonProps } from "@/types";

const CustomButton = ({ title, containerStyles, handleClick }: CustomButtonProps) => {
    return (
        <button
            disabled={false}
            type={'button'}
            className={`custom-button ${containerStyles}`}
            onClick={handleClick}
        >
            <span className='text-primary'>
                {title}
            </span>
        </button>
    )
}

export default CustomButton
