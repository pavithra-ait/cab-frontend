import './App.css';
import Routerpage from './Component/Routerpage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QarsqB2pSOXCd2YjNNIrfE03vZOmWl97GJRmRUSvKHBu4JIlFe3rJSAiBlSdDlWo9x5OIMzzIXFf8hUUMp1Reoj00EDkBkhrD');

function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <Routerpage />
      </Elements>

    </div>
  );
}

export default App;
