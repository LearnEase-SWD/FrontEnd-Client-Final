import { Button, Image } from "antd"

interface ErrorPageProps {
  errorMsg?: string
  statusCode?: number
}

export default function ErrorPage({ errorMsg = "An unexpected error occurred.", statusCode = 500 }: ErrorPageProps) {

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Oops! An error occurred
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            {statusCode > 0 && `Error ${statusCode}: `}{errorMsg}
          </p>
        </div>
        <div className="relative w-full h-64 sm:h-72 md:h-80">
          <Image
            src="https://edupress.thimpress.com/wp-content/themes/edu-press/images/image-404.png"
            alt="Error illustration"
          />
        </div>
        <div className="mt-8">
          <Button className="w-full">
            <a href="/" >
            Go Back
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}