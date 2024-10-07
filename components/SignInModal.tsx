import { CreateWalletButton, EmbeddedWallet, RestoreWalletButton } from '@prex0/uikit/wallet'
import { BaseModal } from './BaseModal'
import { AiOutlineClose } from 'react-icons/ai'
import { UILabel1 } from '@prex0/uikit'

export const SignInModal = ({
  isOpen,
  onRequestClose,
}: {
  isOpen: boolean
  onRequestClose: () => void
}) => {
  return (
    <BaseModal isOpen={isOpen} onRequestClose={onRequestClose} maxWidth={500}>
			<div className='p-6 flex justify-between items-center'>
				<UILabel1>Sign In</UILabel1>
				<div className="cursor-pointer">
					<AiOutlineClose
						className="w-8 h-8 text-zinc-800"
						onClick={onRequestClose}
					/>
				</div>
			</div>

      <EmbeddedWallet walletCreationComponent={<div className="mt-1 flex justify-center items-center">
        <div className='space-y-2'>
            <CreateWalletButton buttonText="Create Wallet"/>
            <RestoreWalletButton buttonText="Restore Wallet" />
        </div>
      </div>}>
      <div className="p-5">
        <div className="flex justify-center items-center">
          <div className="w-80">
            <div>Login Success</div>
            <div className="w-full mt-20">
              <button onClick={onRequestClose} className="bg-zinc-800 text-white px-4 py-2 rounded-md w-full">Close</button>
            </div>
          </div>
        </div>
      </div>

      </EmbeddedWallet>
    </BaseModal>
  )
}
