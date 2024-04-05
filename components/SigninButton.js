'use client'
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Components.module.scss"
import Image from "next/image";

const SigninButton = () => {
  const { data: session } = useSession();

  const handleClick = async () => {
    await signIn("google");
  };

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (session && session.user) {
    return (
      <>
        {/* <Image
          src={session.user.image}
          width={96}
          height={96}
          alt="profile"
        />
        <p className="text-sky-600">{session.user.name}</p>
        <p className="text-sky-600">{session.user.email}</p> */}
        {/* <p className="text-sky-600">{JSON.stringify(session)}</p> */}
        <button onClick={toggleModal} className={styles.loginbtn}>
          Account
        </button>
        {showModal && (
        <div className={styles.signinBG}>
          <div className={styles.signCard}>
            <button onClick={toggleModal} className={styles.signcls}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.251763 0.251763C0.331366 0.171957 0.425933 0.10864 0.530044 0.0654386C0.634156 0.0222369 0.745768 0 0.858488 0C0.971207 0 1.08282 0.0222369 1.18693 0.0654386C1.29104 0.10864 1.38561 0.171957 1.46521 0.251763L6.00022 4.78849L10.5352 0.251763C10.6149 0.172086 10.7095 0.108884 10.8136 0.065763C10.9177 0.0226426 11.0293 0.000448674 11.142 0.000448674C11.2546 0.000448674 11.3662 0.0226426 11.4703 0.065763C11.5744 0.108884 11.669 0.172086 11.7487 0.251763C11.8284 0.331439 11.8916 0.426028 11.9347 0.53013C11.9778 0.634232 12 0.745808 12 0.858488C12 0.971167 11.9778 1.08274 11.9347 1.18685C11.8916 1.29095 11.8284 1.38554 11.7487 1.46521L7.21196 6.00022L11.7487 10.5352C11.8284 10.6149 11.8916 10.7095 11.9347 10.8136C11.9778 10.9177 12 11.0293 12 11.142C12 11.2546 11.9778 11.3662 11.9347 11.4703C11.8916 11.5744 11.8284 11.669 11.7487 11.7487C11.669 11.8284 11.5744 11.8916 11.4703 11.9347C11.3662 11.9778 11.2546 12 11.142 12C11.0293 12 10.9177 11.9778 10.8136 11.9347C10.7095 11.8916 10.6149 11.8284 10.5352 11.7487L6.00022 7.21196L1.46521 11.7487C1.38554 11.8284 1.29095 11.8916 1.18685 11.9347C1.08274 11.9778 0.971167 12 0.858488 12C0.745808 12 0.634232 11.9778 0.53013 11.9347C0.426028 11.8916 0.331439 11.8284 0.251763 11.7487C0.172086 11.669 0.108884 11.5744 0.065763 11.4703C0.0226426 11.3662 0.000448674 11.2546 0.000448674 11.142C0.000448674 11.0293 0.0226426 10.9177 0.065763 10.8136C0.108884 10.7095 0.172086 10.6149 0.251763 10.5352L4.78849 6.00022L0.251763 1.46521C0.171957 1.38561 0.10864 1.29104 0.0654386 1.18693C0.0222369 1.08282 0 0.971207 0 0.858488C0 0.745768 0.0222369 0.634156 0.0654386 0.530044C0.10864 0.425933 0.171957 0.331366 0.251763 0.251763Z" fill="black"/>
              </svg>
            </button>
            <div className={styles.accountd}>
              <Image
              src={session.user.image}
              width={32}
              height={32}
              alt="profile"
              className={styles.image}
              />
              <div className={styles.g2}>
                <h4 className={styles.name}>{session.user.name}</h4>
                <p className={styles.email}>{session.user.email}</p>
              </div>
            </div>
            <button onClick={() => {signOut(); toggleModal()}} className={styles.singbtn}>
              <div className={styles.googlesign}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                  <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                </svg>
                <h4 className={styles.ttl}>Log out</h4>
              </div>
            </button>
          </div>
        </div>)}
      </>
    );
  }

  return (
    <>
      <button onClick={toggleModal} className={styles.loginbtn}>
      {/* <Image
        src={"./icons8-google.svg"}
        width={24}
        height={24}
        alt="Google logo"
      /> */}
      Log-in
      </button>
        {showModal && (
        <div className={styles.signinBG}>
          <div className={styles.signCard}>
            <button onClick={toggleModal} className={styles.signcls}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.251763 0.251763C0.331366 0.171957 0.425933 0.10864 0.530044 0.0654386C0.634156 0.0222369 0.745768 0 0.858488 0C0.971207 0 1.08282 0.0222369 1.18693 0.0654386C1.29104 0.10864 1.38561 0.171957 1.46521 0.251763L6.00022 4.78849L10.5352 0.251763C10.6149 0.172086 10.7095 0.108884 10.8136 0.065763C10.9177 0.0226426 11.0293 0.000448674 11.142 0.000448674C11.2546 0.000448674 11.3662 0.0226426 11.4703 0.065763C11.5744 0.108884 11.669 0.172086 11.7487 0.251763C11.8284 0.331439 11.8916 0.426028 11.9347 0.53013C11.9778 0.634232 12 0.745808 12 0.858488C12 0.971167 11.9778 1.08274 11.9347 1.18685C11.8916 1.29095 11.8284 1.38554 11.7487 1.46521L7.21196 6.00022L11.7487 10.5352C11.8284 10.6149 11.8916 10.7095 11.9347 10.8136C11.9778 10.9177 12 11.0293 12 11.142C12 11.2546 11.9778 11.3662 11.9347 11.4703C11.8916 11.5744 11.8284 11.669 11.7487 11.7487C11.669 11.8284 11.5744 11.8916 11.4703 11.9347C11.3662 11.9778 11.2546 12 11.142 12C11.0293 12 10.9177 11.9778 10.8136 11.9347C10.7095 11.8916 10.6149 11.8284 10.5352 11.7487L6.00022 7.21196L1.46521 11.7487C1.38554 11.8284 1.29095 11.8916 1.18685 11.9347C1.08274 11.9778 0.971167 12 0.858488 12C0.745808 12 0.634232 11.9778 0.53013 11.9347C0.426028 11.8916 0.331439 11.8284 0.251763 11.7487C0.172086 11.669 0.108884 11.5744 0.065763 11.4703C0.0226426 11.3662 0.000448674 11.2546 0.000448674 11.142C0.000448674 11.0293 0.0226426 10.9177 0.065763 10.8136C0.108884 10.7095 0.172086 10.6149 0.251763 10.5352L4.78849 6.00022L0.251763 1.46521C0.171957 1.38561 0.10864 1.29104 0.0654386 1.18693C0.0222369 1.08282 0 0.971207 0 0.858488C0 0.745768 0.0222369 0.634156 0.0654386 0.530044C0.10864 0.425933 0.171957 0.331366 0.251763 0.251763Z" fill="black"/>
              </svg>
            </button>
            <button onClick={() => {handleClick(); toggleModal()}} className={styles.singbtn}>
              <div className={styles.googlesign}>
                <Image
                src={"./icons8-google.svg"}
                width={24}
                height={24}
                alt="Google logo"
                />
                <h4 className={styles.ttl}>Log in With Google</h4>
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SigninButton;
