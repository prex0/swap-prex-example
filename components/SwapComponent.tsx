import { Swap, SwapAmountInput, SwapToggleButton, SwapButton, SwapMessage } from '@prex0/uikit/swap';
import { TOKEN_LIST } from '../constants.ts';

export const SwapForm = () => {
  return (
    <div className="p-0">
      <Swap className="mt-4">
        <SwapAmountInput
          label="Sell"
          swappableTokens={TOKEN_LIST}
          type='from'
          />
        <SwapToggleButton />
        <SwapAmountInput
          label="Buy"
          swappableTokens={TOKEN_LIST}
          type='to'/>
        <SwapButton />
        <SwapMessage />
      </Swap>
    </div>
  );
};