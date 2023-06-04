import { NextPage } from "next";
import { Html, Head, Main, NextScript } from "next/document";

const _document: NextPage<{}> = () => {
    return (
        <Html>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="This is my app"/>
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
};

export default _document;