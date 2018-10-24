
// 解析 Azoth 的数据表格
export function parseAzothTb (origin) {
  let prevColCount = -1
  origin.map((row, index1) => {
    if (row.length === prevColCount) {
      row.map((col, index2) => {
        origin[index1][index2].width = origin[index1 - 1][index2].width
      })
    }
    prevColCount = row.length
  })
  return origin
}

/**
 * 根据 data 生成 table html 字符串
 * @param {*} data
 */
export function parseTbDataToHtml (data) {
  data = parseAzothTb(data)
  let rowWidth = 0
  let rowPercent = 0

  data[0].map(cell => {
    rowWidth += Number(cell.width)
  })
  let htmlstr = `<div class="table" style="display: block; font-weight: normal; margin: 0; padding: 0; border-top: 1px solid #dfdfe8; border-left: 1px solid #dfdfe8; font-size: 12px;">`

  data.map((row) => {
    rowPercent = 0
    htmlstr += `<div class="row" style="display: flex; font-weight: normal; margin: 0; padding: 0;">`

    row.map((cell, cellIndex) => {
      // 最后一列的宽度通过 100% 减去前面的列的宽度，保证宽度一致
      if (cellIndex < row.length - 1) {
        rowPercent += Math.floor(cell.width / rowWidth * 100)
      }

      if (cellIndex === row.length - 1) {
        if (/.*[\u4e00-\u9fa5]+.*$/.test(cell.text) || cell.text === ' ') {
          htmlstr += `<span class="cel" style="width:${100 - rowPercent}%; font-weight: normal; margin: 0; padding: 0; background-color: #f9f9fb; padding: 4px 8px; border-right: 1px solid #dfdfe8; border-bottom: 1px solid #dfdfe8; text-align: center;">${cell.text}</span>`
        } else {
          htmlstr += `<span class="cel" style="width:${100 - rowPercent}%; font-weight: normal; margin: 0; padding: 0; background-color: white; padding: 4px 8px; border-right: 1px solid #dfdfe8; border-bottom: 1px solid #dfdfe8; text-align: center;">${cell.text}</span>`
        }
      } else {
        if (/.*[\u4e00-\u9fa5]+.*$/.test(cell.text) || cell.text === ' ') {
          htmlstr += `<span class="cel" style="width:${Math.floor(cell.width / rowWidth * 100)}%; font-weight: normal; margin: 0; padding: 0; background-color: #f9f9fb; padding: 4px 8px; border-right: 1px solid #dfdfe8; border-bottom: 1px solid #dfdfe8; text-align: center;">${cell.text}</span>`
        } else {
          htmlstr += `<span class="cel" style="width:${Math.floor(cell.width / rowWidth * 100)}%; font-weight: normal; margin: 0; padding: 0; background-color: white; padding: 4px 8px; border-right: 1px solid #dfdfe8; border-bottom: 1px solid #dfdfe8; text-align: center;">${cell.text}</span>`
        }
      }
    })

    htmlstr += '</div>'
  })
  htmlstr += '</div>'
  return htmlstr
}