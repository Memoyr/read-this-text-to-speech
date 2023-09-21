import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Modal from 'react-modal'
import Signin from './signin'
import styles from '@/styles/menu.module.css'

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement(document.getElementById('root'))

const DrawerOverlay = () => {
  const router = useRouter()
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div className={styles.menuContainer}>
      <button className={styles.sideMenuBtn} onClick={openModal}>
        <svg
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          data-view-component="true"
          className={styles.hamburgerIcon}
        >
          <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
        </svg>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <button onClick={closeModal} className={styles.closeBtn}>
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
            className={styles.closeBtnIcon}
          >
            <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
          </svg>
        </button>
        <div>
          <ul className={styles.list}>
            <li>
              <Link
                href="/contact"
                className={router.pathname === '/contact' ? 'l-active' : ''}
              >
                Contact
              </Link>
            </li>
            <li>
              <Signin asButton={false} />
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  )
}

export default DrawerOverlay

{
  /*    <a href="#" role="menuitem">Account settings</a>
        <a href="#" role="menuitem">Support</a>
        <a href="#" role="menuitem">License</a> */
}
