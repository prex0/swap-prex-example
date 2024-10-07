import { Swap, SwapAmountInput, SwapToggleButton, SwapButton, SwapMessage } from '@prex0/uikit/swap';

export const SwapForm = () => {
  return (
    <div>
      <Swap className="mt-3">
        <SwapAmountInput
          label="Sell"
          type='from'
          />
        <SwapToggleButton />
        <SwapAmountInput
          label="Buy"
          type='to'/>
        <SwapButton />
        <SwapMessage />
      </Swap>
    </div>
  );
};