"use client"

import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Swap, SwapAmountForm, SwapTokenSelector, SwapToggleButton, SwapMessage, SwapButton } from "@prex0/uikit/swap"
import { AmountFormInput, AmountFormMaxButton } from "@prex0/uikit"
import { Token } from "@prex0/prex-client"

const tokens = [
  { symbol: "ETH", name: "Ethereum", icon: "🔹" },
  { symbol: "USDC", name: "USD Coin", icon: "💲" },
  { symbol: "DAI", name: "Dai", icon: "🟨" },
  { symbol: "WBTC", name: "Wrapped Bitcoin", icon: "🟠" },
]

export default function Component() {
  const [fromToken, setFromToken] = useState(tokens[0])
  const [toToken, setToToken] = useState(null)
  const [isSignInOpen, setIsSignInOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-100 to-violet-100 flex flex-col">
      <header className="w-full bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-purple-600 mr-2">🔄</span>
            <span className="text-xl font-semibold text-gray-800">SwapApp</span>
          </div>
          <div className="flex items-center space-x-4">
            <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-gray-600 border-gray-300">
                  <EmbeddedWallet walletCreationComponent={<div>Sign in</div>}>
                    <Address />
                  </EmbeddedWallet>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Sign in</DialogTitle>
                  <DialogDescription>
                    Supports Arbitrum.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center">
                  <EmbeddedWallet walletCreationComponent={<div>
                    <CreateWalletButton buttonText="Create Wallet" >
                      <Button >Create New Wallet</Button>
                    </CreateWalletButton>
                    <RestoreWalletButton buttonText="Restore Wallet" >
                      <Button >Already have a wallet?</Button>
                    </RestoreWalletButton>
                  </div>}>
                    <div className="flex flex-col items-center">

                      <MyCode />
                    </div>
                    <Address isSliced={false} />
                  </EmbeddedWallet>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Swap>
          <div className="w-full max-w-md space-y-6">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
              Swap anytime,
              <br />
              anywhere.
            </h1>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Sell</span>
                  <span className="text-gray-400">$0</span>
                </div>
                <div className="flex items-center">
                  <SwapAmountForm type="from" amount="0">
                    <AmountFormInput >
                      <Input
                        type="number"
                        placeholder="0"
                        className="bg-transparent text-4xl font-bold text-gray-800 border-none focus:outline-none focus:ring-0 w-full"
                      />
                    </AmountFormInput>
                    <SwapTokenSelector type="from">
                      <TokenSelector />
                    </SwapTokenSelector>

                  </SwapAmountForm>
                </div>
              </div>
              <div className="flex justify-center">
                <SwapToggleButton>
                  <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
                    <ChevronDown className="h-6 w-6" />
                  </Button>
                </SwapToggleButton>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Buy</span>
                </div>
                <div className="flex items-center">
                  <SwapAmountForm type="to" amount="0">
                    <AmountFormInput>
                      <Input
                        type="number"
                        placeholder="0"
                        className="bg-transparent text-4xl font-bold text-gray-800 border-none focus:outline-none focus:ring-0 w-full"
                        readOnly
                      />
                    </AmountFormInput>
                    <SwapTokenSelector type="to">
                      <TokenSelector />
                    </SwapTokenSelector>
                  </SwapAmountForm>
                </div>
              </div>
            </div>
            <SwapButton>
              <CustomButton>
                Swap
              </CustomButton>
            </SwapButton>
          </div>
        </Swap>
      </main>
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
      <SelectTrigger className="w-28 border-none bg-gray-100 text-gray-800">
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

function CustomButton({ disabled, isLoading, onClick, children }: { disabled?: boolean, isLoading?: boolean, onClick?: () => void, children: React.ReactNode }) {
  return <Button
    className="w-full bg-purple-500 hover:bg-purple-600 text-white text-lg py-6 rounded-xl shadow-lg"
    disabled={disabled}
    onClick={onClick}
  >{isLoading ? 'Loading...' : children}</Button>
}