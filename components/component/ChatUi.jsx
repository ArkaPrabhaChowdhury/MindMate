/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/6x8KZdAOcbW
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ChatUi() {
  return (
    (<div className="flex h-screen w-full">
      <div
        className="hidden w-64 flex-col border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-900 lg:flex">
        <div
          className="flex h-16 items-center justify-between border-b px-6 dark:border-gray-800">
          <a className="flex items-center gap-2 font-semibold" href="#">
            <TextIcon className="h-6 w-6" />
            <span>Mental Health Chat</span>
          </a>
          <Button className="h-8 w-8" size="icon" variant="ghost">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-4">
            <li>
              <a
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                href="#">
                <HomeIcon className="h-4 w-4" />
                Home
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                href="#">
                <TextIcon className="h-4 w-4" />
                Chat
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                href="#">
                <UsersIcon className="h-4 w-4" />
                Community
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                href="#">
                <UserIcon className="h-4 w-4" />
                Therapists
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-auto border-t px-4 py-4 dark:border-gray-800">
          <Button className="w-full" variant="link">
            <PlusIcon className="mr-2 h-4 w-4" />
            Start a new chat
          </Button>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div
          className="flex h-16 items-center justify-between border-b bg-gray-100 px-6 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
          <a className="flex items-center gap-2 font-semibold" href="#">
            <TextIcon className="h-6 w-6" />
            <span>Mental Health Chat</span>
          </a>
          <Button className="h-8 w-8" size="icon" variant="ghost">
            <MenuIcon className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="flex items-start gap-4">
              <img
                alt="Avatar"
                className="h-10 w-10 rounded-full"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40} />
              <div className="flex-1 rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-800">
                <p>
                  Hi there! I'm an AI chatbot here to help you find closure and support for your mental health
                  challenges. How can I assist you today?
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 flex-row-reverse">
              <img
                alt="Avatar"
                className="h-10 w-10 rounded-full"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40} />
              <div className="flex-1 rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-800">
                <p>
                  I've been struggling with depression for a while now. I feel like I'm not getting the support I need
                  from my friends and family. Can you help me find some resources to work through this?
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <img
                alt="Avatar"
                className="h-10 w-10 rounded-full"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40} />
              <div className="flex-1 rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-800">
                <p>
                  Absolutely, I'd be happy to help. Let's start by discussing some self-care strategies you can try, and
                  then I can provide information on local support groups and therapists who specialize in depression.
                  Does that sound like a good place to begin?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex h-16 items-center justify-between border-t bg-gray-100 px-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex-1">
            <form>
              <div className="relative">
                <PaperclipIcon
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Textarea
                  className="block w-full resize-none rounded-md border-none bg-transparent py-2 pl-8 pr-12 text-sm shadow-none focus:ring-0 dark:bg-gray-950"
                  placeholder="Type your message..." />
                <Button
                  className="absolute right-2.5 top-2.5 h-8 w-8"
                  size="icon"
                  variant="ghost">
                  <SendIcon className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="hidden w-80 flex-col border-l bg-gray-100 dark:border-gray-800 dark:bg-gray-900 lg:flex">
        <div
          className="flex h-16 items-center justify-between border-b px-6 dark:border-gray-800">
          <h3 className="text-sm font-semibold">Chat History</h3>
          <Button className="h-8 w-8" size="icon" variant="ghost">
            <SearchIcon className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4 px-6">
            <div className="flex items-center gap-3">
              <img
                alt="Avatar"
                className="h-10 w-10 rounded-full"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40} />
              <div>
                <h4 className="text-sm font-medium">John Doe</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hey, I'm struggling with anxiety. Can you help?
                </p>
              </div>
              <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">10:30 AM</div>
            </div>
            <div className="flex items-center gap-3">
              <img
                alt="Avatar"
                className="h-10 w-10 rounded-full"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40} />
              <div>
                <h4 className="text-sm font-medium">Jane Smith</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">I'm feeling really down lately. Can we talk?</p>
              </div>
              <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">9:45 AM</div>
            </div>
            <div className="flex items-center gap-3">
              <img
                alt="Avatar"
                className="h-10 w-10 rounded-full"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40} />
              <div>
                <h4 className="text-sm font-medium">Alex Johnson</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  I'm having a hard time coping with my depression. Can you suggest some resources?
                </p>
              </div>
              <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">Yesterday</div>
            </div>
          </div>
        </div>
      </div>
    </div>)
  );
}

function BellIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>)
  );
}


function HomeIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>)
  );
}


function MenuIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>)
  );
}


function PaperclipIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>)
  );
}


function PlusIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>)
  );
}


function SearchIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}


function SendIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>)
  );
}


function TextIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>)
  );
}


function UserIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>)
  );
}


function UsersIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>)
  );
}
