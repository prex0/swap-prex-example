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

	return <div id="page" className="p-10 max-w-lg min-w-80 mx-auto">
		<div className="flex justify-end items-center">
			<EmbeddedWallet walletCreationComponent={<button onClick={() => setIsSignInModalOpen(true)}>Sign In</button>}>
				<Address />
			</EmbeddedWallet>
		</div>
		<SignInModal isOpen={isSignInModalOpen} onRequestClose={() => setIsSignInModalOpen(false)} />
		<SwapForm />
	</div>
}