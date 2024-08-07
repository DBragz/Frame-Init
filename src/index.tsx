import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { verifying } from 'hono/utils/jwt/jws'
// import { neynar } from 'frog/hubs'

import { vars } from './ui'

export const app = new Frog({
  ui: { vars },
  title: 'Mascot Merger',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.use('/*', serveStatic({ root: './public' }))

app.frame('/', (c) => {
  const { inputText } = c
  
  console.log()
  console.log(JSON.stringify(c))
  console.log()

  if (inputText !== undefined) {
    console.log(inputText)
  }

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          backgroundSize: '100% 100%',
          backgroundImage: `url(https://wallpapercave.com/wp/dIRfYNy.jpg)`,
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            marginTop: '100',
            marginRight: '250',
            marginLeft: '10',
          }}
        >
          { inputText === undefined ? 
              `Enter your highschool mascot` 
              : `Enter your college mascot` }
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Mascot" />,
      <Button>Set</Button>
    ],
  })
})

devtools(app, { serveStatic })
