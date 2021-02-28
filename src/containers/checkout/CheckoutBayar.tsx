import React, { useState } from 'react';
import { Button } from 'react-rainbow-components';
import { ProductListProp, ProductListView } from '../kasir/ProductListView';
import { RupiahTextView } from '../kasir/RupiahTextView';
import { Input } from 'react-rainbow-components';

export const CheckoutBayar: React.FC<any & ProductListProp> = (props: any) => {

  let { remote } = require("electron");

  const inputStyles = {
    width: 300,
  };

  const { cart, onBayar } = props;

  function isValid() {
    return uangDiterima <= 0 || uangDiterima < cart.getSubtotal()
  }

  const [uangDiterima, setUangDiterima] = useState(0);

  function handleChange(ev: any) {
    setUangDiterima(ev.target.value)
  }

  return (
    <div>

    { remote.app.getAppPath() }

      <div>
        Total <RupiahTextView harga={cart.getSubtotal()} />
      </div>

      <Button
        onClick={() => { onBayar() }}
      >
        Bayar Dengan Uang Pas
      </Button>

      <Input
        label="Uang Diterima"
        placeholder="Rp. 0"
        type="number"
        value={uangDiterima}
        className="rainbow-p-around_medium"
        style={inputStyles}
        onChange={handleChange}
      />

      <Button
        onClick={() => { onBayar() }}
        disabled={isValid()}
      >
        Bayar
      </Button>

    </div>
  );
};
