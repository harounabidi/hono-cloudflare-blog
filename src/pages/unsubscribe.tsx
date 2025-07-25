import { encryptWithPassword } from "@/utils/hash"

export default async function Unsubscribe({
  email,
  key,
}: {
  email: string
  key: string
}) {
  const emailInitials = email.split("@")[0].slice(0, 3)
  const emailDomain = email.split("@")[1]
  const emailDisplay = `${emailInitials}...@${emailDomain}`

  const encryptedEmail = await encryptWithPassword(email, key)

  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Unsubscribe from Newsletter</title>
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='/css/index.css'
          media='print'
          onload="this.media='all'"
        />
        <link rel='preload' href='/css/index.css' as='style' />
      </head>
      <body>
        <main class='max-w-[45rem] w-full space-y-4 my-8 mx-auto px-4'>
          <h1 class='text-lg font-semibold'>Haroun Abidi</h1>
          <p>Are you sure you want to unsubscribe {emailDisplay}?</p>
          <form action={`/unsubscribe/${encryptedEmail}`} method='post'>
            <input type='hidden' name='email' value={encryptedEmail} />
            <button
              type='submit'
              class='bg-foreground text-sm cursor-pointer font-semibold text-background px-3 py-2 rounded-sm hover:bg-foreground-muted transition-colors duration-200'>
              Unsubscribe from all
            </button>
          </form>
        </main>
      </body>
    </html>
  )
}
