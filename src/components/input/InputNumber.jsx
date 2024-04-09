src/components/input
import React from 'react'

function InputNumber() {
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
  
    const handleIncrement = () => {
      // Aquí puedes aplicar restricciones adicionales, si las necesitas
      setQuantity(quantity + 1);
    };
  
    return (
      <div className="quantity-control">
        <button onClick={handleDecrement}>-</button>
        <input type="text" value={quantity} readOnly />
        <button onClick={handleIncrement}>+</button>
      </div>
    );
  }
  

export default InputNumber
