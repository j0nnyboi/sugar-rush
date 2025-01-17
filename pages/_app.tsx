import { WalletProvider } from '@j0nnyboi/wallet-adapter-react'
import { WalletModalProvider } from '@j0nnyboi/wallet-adapter-react-ui'
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@j0nnyboi/wallet-adapter-wallets'
import { Navbar, Footer, CheckConnectedWallet, NotificationManager } from 'components'
import type { AppProps } from 'next/app'
import { useMemo } from 'react'
import { RecoilRoot } from 'recoil'
import '../styles/globals.scss'
import { theme, ThemeProvider } from '@primer/react'
import deepmerge from 'deepmerge'

function MyApp({ Component, pageProps }: AppProps) {
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter(),
            new TorusWalletAdapter(),
            new SolletWalletAdapter(),
            new SolletExtensionWalletAdapter(),
        ],
        []
    )
    const customTheme = deepmerge(theme, {})

    return (
        // @ts-ignore
        <ThemeProvider theme={customTheme}>
            <WalletProvider wallets={wallets}>
                <RecoilRoot>
                    <WalletModalProvider>
                        <Navbar />
                        <CheckConnectedWallet>
                            <div className='container-xl p-responsive height-full my-11'>
                                <Component {...pageProps} />
                            </div>
                        </CheckConnectedWallet>
                    </WalletModalProvider>
                    <NotificationManager />
                    <Footer />
                </RecoilRoot>
            </WalletProvider>
        </ThemeProvider>
    )
}

export default MyApp
