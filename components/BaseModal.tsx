import { ReactNode } from 'react'
import Modal from 'react-modal'

export const ModalTitle = ({ children }: { children: ReactNode }) => {
  return <div className="my-0 text-md font-medium">{children}</div>
}

export const BaseModal = ({
  isOpen,
  onRequestClose,
  children,
  maxWidth,
  height = 320
}: {
  isOpen: boolean
  onRequestClose: () => void
  children: ReactNode
  maxWidth?: number
  height?: number
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      style={{
        overlay: {
          zIndex: 100,
          backgroundColor: '#ffffff10',
          backdropFilter: 'blur(2px)'
        },
        content: {
          borderRadius: 8,
          backgroundColor: '#ffffff',
          height: height,
          width: '100%',
          maxWidth: maxWidth,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }
      }}
    >
      {children}
    </Modal>
  )
}
