import Head from 'next/head';

import { Layout } from '../src/components/Layout';
import { InputForm } from '../src/components/InputForm';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>NPM.click</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-gray-800 text-white text-center py-6">
          <h1 className="text-2xl font-medium">
            Are your dependencies up to date?
          </h1>
        </div>

        <InputForm />

        <div className="bg-gray-300 py-5">
          <div className="container">
            <h2 className="text-xl font-medium text-center mt-5 mb-10">
              All you need is your package.json. That's all!
            </h2>

            <div className="flex flex-row">
              <div className="px-5 mb-8">
                <img
                  src="/images/npm-logo.png"
                  className="block mx-auto mb-5 rounded-lg shadow-lg"
                  style={{ maxWidth: '10rem' }}
                />
                <p className="lead">
                  NPM is awesome! We all use it. Dependencies get updated daily
                  so if you want to be up to date, you are at the right place.
                </p>
              </div>

              <div className="px-5 mb-8">
                <img
                  src="/images/packagejson.png"
                  className="block mx-auto mb-5 rounded-lg shadow-lg"
                  style={{ maxWidth: '10rem' }}
                />
                <p className="lead">
                  Got your package.json? Drop it on the search bar, copy &amp;
                  paste its contents to the text box or use the upload button.
                  Whatever works for you. That's all!
                </p>
              </div>

              <div className="px-5 mb-8">
                <img
                  src="/images/results.png"
                  className="block mx-auto mb-5 rounded-lg shadow-lg"
                  style={{ maxWidth: '10rem' }}
                />
                <p className="lead">
                  Still not convienced? There's a 'demo' button next to the
                  search form. Yeap that green one. Click on it and see what
                  happens!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
