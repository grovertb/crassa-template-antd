import fs from 'fs'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

export const setRenderUniversal = (locals, app, extractor) => {
  const sheet = new ServerStyleSheet()
  try {
    const { htmlData } = locals
    const renderString = renderToString(sheet.collectStyles(app))

    const appBuild = path.join(process.env.APP_ROOT, 'build')
    const arrStyles = extractor.getStyleElements().map(({ props: { href } }) => fs.readFileSync(appBuild + href, 'utf8'))

    const ssrStyles = ` <style id='css-ss-server-side' type="text/css">html { margin:0px; padding:0px } ${arrStyles.join('')}</style>${sheet.getStyleTags()}`

    return {
      prevHtml: htmlData.replace('<head>', `<head>${ssrStyles}`),
      renderString
    }
  } catch (error) {
    console.error(error)
  } finally {
    sheet.seal()
  }
}
