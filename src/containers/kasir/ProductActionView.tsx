import React from 'react';
import { ButtonIcon } from 'react-rainbow-components';
import { MdAdd, MdRemove } from "react-icons/md";

interface ProductActionProps {
  addProduct: () => void,
  removeProduct: () => void,
  count: number
}

export const ProductActionView: React.FC<any & ProductActionProps> = (props: any) => {

  return (
    <div className="rainbow-p-vertical_large rainbow-p-left_x-large rainbow-flex rainbow-align_center">
      <div className="rainbow-p-right_large">
        <ButtonIcon variant="success" icon={<MdAdd />} onClick={()=>{
          props.addProduct()
        }} />
      </div>

      <div className="rainbow-p-right_large">
        <ButtonIcon variant="border-filled" icon={<MdRemove />} onClick={() => {
          props.removeProduct()
        }} />
      </div>

      <div>
        { props.count}
      </div>

    </div>
  )
}
