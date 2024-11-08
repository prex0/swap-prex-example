import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateWalletButton, EmbeddedWallet, RestoreWalletButton } from '@prex0/uikit/wallet'
import { Address, MyCode } from "@prex0/uikit/identity"
import { Swap, SwapAmountForm, SwapTokenSelector, SwapToggleButton, SwapMessage, SwapButton, SwapBalance } from "@prex0/uikit/swap"
import { AmountFormBalance, AmountFormInput, AmountFormMaxButton } from "@prex0/uikit"
import { Token } from "@prex0/prex-client"
import { USDC_TOKEN, WETH_TOKEN } from "../constants"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-100 to-violet-100 flex flex-col">
      <header className="w-full bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-purple-600 mr-2">🔄</span>
            <span className="text-xl font-semibold text-gray-800">SwapApp</span>
          </div>
          <div className="flex items-center space-x-4">
            <SignInButton className="w-full text-gray-600 border-gray-300" />
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="my-1 text-sm">
          Do you have MetaMask?
          Please try the <a href="https://app.predy.finance" className="underline">Predy App</a>.
        </div>
        <Swap>
          <div className="w-full max-w-md space-y-6">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
              Swap anytime,
              <br />
              anywhere.
            </h1>
            <div className="space-y-4">
              <SwapAmountForm type="from" amount="0">
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Sell</span>
                    <span className="text-gray-400 flex justify-end items-center">
                      <AmountFormBalance />
                      <AmountFormMaxButton className="w-10" asChild>
                        <span className="text-gray-400 cursor-pointer">Max</span>
                      </AmountFormMaxButton>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <AmountFormInput className="bg-transparent text-4xl font-bold text-gray-800 border-none outline-none shadow-none focus:ring-0 w-full appearance-none" />
                    <SwapTokenSelector type="from" token={USDC_TOKEN}>
                      <TokenSelector />
                    </SwapTokenSelector>
                  </div>
                </div>
              </SwapAmountForm>
              <div className="flex justify-center">
                <SwapToggleButton className="rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
                  <ChevronDown className="h-6 w-6" />
                </SwapToggleButton>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Buy</span>
                </div>
                <div className="flex items-center">
                  <SwapAmountForm type="to" amount="0">
                    <AmountFormInput className="bg-transparent text-4xl font-bold text-gray-800 border-none outline-none shadow-none focus:outline-none focus:ring-0 w-full" />
                    <SwapTokenSelector type="to" token={WETH_TOKEN}>
                      <TokenSelector />
                    </SwapTokenSelector>
                  </SwapAmountForm>
                </div>
              </div>
            </div>
            <SwapMessage />
            <EmbeddedWallet walletCreationComponent={<SignInButton className="w-full bg-purple-500 hover:bg-purple-600 text-white text-lg py-6 rounded-xl shadow-lg"/>}>
              <SwapButton className="w-full bg-purple-500 hover:bg-purple-600 text-white text-lg py-6 rounded-xl shadow-lg">Swap</SwapButton>
            </EmbeddedWallet>
          </div>
        </Swap>
      </main>
      <Toaster />
    </div>
  )
}

export function TokenSelector({
  token,
  setToken,
  options,
  disabled
}: {
  token?: Token;
  setToken?: (token: Token) => void;
  options?: Token[];
  disabled?: boolean;
}) {
  if (!options || !setToken) {
    return null;
  }

  return (
    <Select value={token?.symbol} onValueChange={(value) => setToken(options.find((t) => t.symbol === value)!)} disabled={disabled}>
      <SelectTrigger className="w-[128px] border-none bg-gray-100 text-gray-800">
        <SelectValue placeholder="Select token" />
      </SelectTrigger>
      <SelectContent className="bg-white text-gray-800">
        {options.map((token) => (
          <SelectItem key={token.symbol} value={token.symbol}>
            <div className="flex items-center">
              <span className="mr-2"><img src={token.image ?? ''} alt={token.symbol} className="w-4 h-4" /></span>
              {token.symbol}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}


function SignInButton({ className }: { className: string }) {
  const { toast } = useToast()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
      <EmbeddedWallet walletCreationComponent={<div>Sign in</div>}>
        <Address />
      </EmbeddedWallet>
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Sign in</DialogTitle>
      <DialogDescription>
        Create a new passkey wallet on Arbitrum.
      </DialogDescription>
    </DialogHeader>
    <div className="flex flex-col items-center">
      <EmbeddedWallet walletCreationComponent={<div>
        <div className="flex flex-col items-center space-y-2">
        <CreateWalletButton buttonText="Create Wallet" className="w-40">
          <Button className="w-full">Create New Wallet</Button>
        </CreateWalletButton>
        <RestoreWalletButton buttonText="Restore Wallet" className="w-40">
          <Button className="w-full" variant="outline">Already have a wallet?</Button>
        </RestoreWalletButton>
        </div>
      </div>}>
        <div className="flex flex-col items-center">
          <MyCode />
        </div>
        <Address isSliced={false} onCopied={() => toast({ title: "Copied address to clipboard" })}/>
      </EmbeddedWallet>
    </div>
  </DialogContent>
</Dialog>)
}