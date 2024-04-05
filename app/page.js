'use client'

import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Style.module.scss"
import Image from "next/image";
import Pass from "../components/Pass"
import Link from "next/link";

export default function page() {
  const { data: session } = useSession();

  const handleClick = async () => {
    await signIn("google");
  };

  const email = { message: 'Hello from the client!' };

  const [showPass, setShowPass] = useState(true);
  const togglePass = () => {
    setShowPass(!showPass);
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
        
        <div className={styles.signinBG}>
          <div className={styles.signCard}>
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
            <>
            {showPass && (
              <>
                <button onClick={togglePass} className={styles.singbtn}>
                  <div className={`${styles.googlesign} ${styles.appp}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                      <linearGradient id="9C-9aFF8pVbUiT-vTlaz4a_KeCyyDy6KmOt_gr1" x1="-276.945" x2="-270.97" y1="-150.581" y2="-144.607" gradientTransform="translate(300.628 170.762)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffd647"></stop><stop offset="1" stop-color="#f5bf00"></stop></linearGradient><path fill="url(#9C-9aFF8pVbUiT-vTlaz4a_KeCyyDy6KmOt_gr1)" d="M21.002,26.999v-5.999h13.001v5.999H21.002z"></path><linearGradient id="9C-9aFF8pVbUiT-vTlaz4b_KeCyyDy6KmOt_gr2" x1="-273.825" x2="-269.3" y1="-148.416" y2="-143.891" gradientTransform="translate(311.328 175.915)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#33c481"></stop><stop offset="1" stop-color="#21a366"></stop></linearGradient><path fill="url(#9C-9aFF8pVbUiT-vTlaz4b_KeCyyDy6KmOt_gr2)" d="M34.003,32.999v-5.999l6-2.001l6,2.001v5.999h-4	l0.001-2c0-1.104-0.897-2-2.001-2c-1.104,0-2.001,0.896-2.001,2v2H34.003z"></path><linearGradient id="9C-9aFF8pVbUiT-vTlaz4c_KeCyyDy6KmOt_gr3" x1="-275.575" x2="-265.236" y1="-151.836" y2="-141.496" gradientTransform="translate(305.738 165.995)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#33c481"></stop><stop offset="1" stop-color="#0a8645"></stop></linearGradient><path fill="url(#9C-9aFF8pVbUiT-vTlaz4c_KeCyyDy6KmOt_gr3)" fill-rule="evenodd" d="M34.003,26.999	v-5.999h12v5.999H34.003z" clip-rule="evenodd"></path><linearGradient id="9C-9aFF8pVbUiT-vTlaz4d_KeCyyDy6KmOt_gr4" x1="-280.986" x2="-268.801" y1="-154.014" y2="-141.828" gradientTransform="translate(282.472 166.497)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#55adfd"></stop><stop offset="1" stop-color="#438ffd"></stop></linearGradient><path fill="url(#9C-9aFF8pVbUiT-vTlaz4d_KeCyyDy6KmOt_gr4)" d="M2.004,23.999c0-6.071,4.927-10.999,10.999-10.999	c5.031,0,9.276,3.385,10.583,8l-2.583,0.999l-4.003-0.999c-0.913-1.213-2.365-2-3.997-2c-2.759,0-4.999,2.241-4.999,4.999	c0,2.759,2.24,4.999,4.999,4.999c1.632,0,3.084-0.784,3.996-1.999l4.004-1l2.583,1c-1.307,4.616-5.553,7.999-10.583,7.999	C6.931,34.998,2.004,30.071,2.004,23.999z"></path><linearGradient id="9C-9aFF8pVbUiT-vTlaz4e_KeCyyDy6KmOt_gr5" x1="-278.372" x2="-272.665" y1="-151.369" y2="-145.663" gradientTransform="translate(294.02 170.725)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f44f5b"></stop><stop offset="1" stop-color="#e5202e"></stop></linearGradient><path fill="url(#9C-9aFF8pVbUiT-vTlaz4e_KeCyyDy6KmOt_gr5)" d="M18.002,23.999c0-1.124-0.373-2.163-1.001-2.999h6.585	c0.271,0.953,0.416,1.96,0.416,2.999c0,1.041-0.145,2.048-0.416,3h-6.587C17.629,26.165,18.002,25.125,18.002,23.999z"></path>
                    </svg>
                    <h4 className={styles.ttl}>App password</h4>
                  </div>
                </button>
              </>
            )}

            {!showPass && (
              <>
                <Pass email={session.user.email}/>
              </>
            )}
            </>
            <div className={styles.btngrp}>
              <button onClick={() => {signOut()}} className={styles.singbtn}>
                <div className={`${styles.googlesign} ${styles.logout}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                    <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                  </svg>
                </div>
              </button>
              <Link href='./send' className={styles.singbtn}>
                <div className={`${styles.googlesign} ${styles.cont}`}>
                  <div></div>
                  <h4 className={styles.ttl}>Continue</h4>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-up-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className={styles.signinBG}>
        <div className={styles.signCard}>
          <button onClick={() => {handleClick()}} className={styles.singbtn}>
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
    </>
  );
};