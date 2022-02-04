import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useMoralis } from 'react-moralis'
import { NFTList } from '../components/NFTList'

const Home: NextPage = () => {
  const { isAuthenticated, authenticate, logout } = useMoralis();

  return (
    <div className="w-full bg-navy">
      <Head>
        <title>NFT2AppleWallet</title>
        <meta name="description" content="NFT to Apple Wallet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-2 bg-navy w-full min-h-full text-center font-outfit">
      <div className="w-full h-48 flex items-center justify-between md:p-6">
<div><img src="img/NFT2walletLogo.png" className="h-36"></img></div>
<div className="text-white font-sans font-light text-slate-300 md:text-lg text-xs">You are currently not logged in</div>
      </div>
        <div className="text-white md:text-8xl text-6xl">
          Your NFTs
        </div>
        <div className="text-orange-300 md:text-8xl text-6xl pt-6 leading-normal">
          in the real world
        </div>

        <p className="text-xl text-slate-300 p-6 font-sans font-light">
          Send your NFTs to your Apple/Google Wallet
        </p>
        
        {isAuthenticated ? 
        <div>
          <div 
                className=""
                onClick={() => {
                  logout()
                  .then(function () {
                    console.log("logged out");
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
                } 
                }
              >
                <h2>Sign Out From MetaMask </h2>
              </div>
          <NFTList/> 
        </div>
          : 
          <div>
            <p className="text-xl text-slate-300 font-sans font-light">
              Get started by logging in to Your Metamask wallet, so that we can list your NFTs
            </p>
            <div className="">
              <div 
                className=""
                onClick={() => {
                  authenticate({ signingMessage: "Authorize linking of your wallet" })
                  .then(function (user) {
                    console.log("logged in user:", user);
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
                } 
                }
              >
                <div className="p-6 mb-10 mt-10 bg-orange-300 w-full md:w-1/3 rounded-md hover:text-green-700 mx-auto font-sans font-bold uppercase text-slate-900 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
</svg>connect metamask wallet</div>
              </div>
            </div>
          </div>
        }
        
      </main>

     <div className="w-full p-6 flex items-center justify-center text-slate-300 font-sans font-light">
        
        <div className=""> Made with</div> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 p-1 text-red-600" viewBox="0 0 20 20" fill="currentColor">
 <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
</svg> for ETHGlobal Hackathon
       
     </div>
   </div>
  )
}

export default Home
