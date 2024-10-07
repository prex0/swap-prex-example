'use client';
import { SwapForm } from "../components/SwapComponent";
import { EmbeddedWallet } from "@prex0/uikit/wallet";
import { Address } from "@prex0/uikit/identity";
import Modal from 'react-modal';
import { SignInModal } from "../components/SignInModal";
import { useState } from "react";
import { FaExchangeAlt } from 'react-icons/fa';

Modal.setAppElement("#page");

export default function Page() {
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

	return (
		<div id="page" className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 px-4 sm:px-0">
			<div className="bg-white rounded-lg shadow-2xl p-2 sm:p-8 w-full max-w-lg">
				<div className="flex flex-col sm:flex-row items-center justify-center mb-6">
					<FaExchangeAlt className="text-4xl text-blue-600 mb-2 sm:mb-0 sm:mr-3" />
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">Swap Pro</h1>
				</div>
				<div className="w-full">
					<div className="flex justify-center sm:justify-end items-center mb-6">
						<EmbeddedWallet 
							walletCreationComponent={
								<button 
									onClick={() => setIsSignInModalOpen(true)}
									className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 text-sm sm:text-base"
								>
									Sign In
								</button>
							}
						>
							<Address />
						</EmbeddedWallet>
					</div>
					<SwapForm />
					<SignInModal isOpen={isSignInModalOpen} onRequestClose={() => setIsSignInModalOpen(false)} />
				</div>
			</div>
		</div>
	);
}