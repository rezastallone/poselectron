import React from 'react';
import { ButtonIcon } from 'react-rainbow-components';
import { MdAdd, MdClose, MdRemove } from "react-icons/md";
import './ProductAction.css'

interface ProductActionProps {
  addProduct: () => void,
  clearProduct: () => void,
  removeProduct: () => void,
  count: number
}

export const ProductActionView: React.FC<any & ProductActionProps> = (props: any) => {

  return (
    <div className="padding-vertical_xsmall rainbow-flex rainbow-align_center">
      <div className="rainbow-p-right_medium">
        <ButtonIcon size="medium" variant="success" icon={<MdAdd />} onClick={()=>{
          props.addProduct()
        }} />
      </div>

      <div className="rainbow-p-right_medium">
        <ButtonIcon size="medium" variant="border-filled" icon={<MdRemove />} onClick={() => {
          props.removeProduct()
        }} />
      </div>

      <div className="rainbow-p-right_medium">
        { props.count}
      </div>

      <div className="rainbow-p-right_medium">
        <ButtonIcon size="medium" variant="border-filled" icon={<MdClose />} onClick={() => {
          props.clearProduct()
        }} />
      </div>
    </div>
  )
}
