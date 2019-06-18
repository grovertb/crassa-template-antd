import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

export const setRenderUniversal = (locals, app, extractor) => {
  const sheet = new ServerStyleSheet()
  try {
    const { htmlData } = locals
    const renderString = renderToString(sheet.collectStyles(app))

    return {
      prevHtml: htmlData.replace('<head>', `<head><style>html { margin:0px; padding:0px }</style>${extractor.getStyleTags()}${sheet.getStyleTags()}`),
      renderString
    }
  } catch (error) {
    console.error(error)
  } finally {
    sheet.seal()
  }
}
