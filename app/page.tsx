'use client';
import { SwapForm } from "../components/SwapComponent";
import { EmbeddedWallet } from "@prex0/uikit/wallet";
import { Address } from "@prex0/uikit/identity";
import Modal from 'react-modal';
import { SignInModal } from "../components/SignInModal";
import { useState } from "react";

Modal.setAppElement("#page");

export default function Page() {
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

	return (
		<div id="page" className="flex flex-col items-center justify-center min-h-screen p-10">
			<h1 className="text-2xl font-bold mb-6">Swap Demo App</h1>
			<div className="w-full max-w-lg min-w-80">
				<div className="flex justify-end items-center mb-4">
					<EmbeddedWallet walletCreationComponent={<button onClick={() => setIsSignInModalOpen(true)}>Sign In</button>}>
						<Address />
					</EmbeddedWallet>
				</div>
				<SwapForm />
				<SignInModal isOpen={isSignInModalOpen} onRequestClose={() => setIsSignInModalOpen(false)} />
			</div>
		</div>
	);
}