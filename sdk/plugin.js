export default class ApplyMonitorPlugin {
	// constructor(options) {
  //   this.options = options;
  // }
  apply(compiler) {
    compiler.hooks.compilation.tap('ApplyMonitorPlugin',
      (compilation, callback) => {
        compilation.plugin(
          "html-webpack-plugin-before-html-processing",
          (htmlPluginData, callback) => {
						const script = `<script src="main.fa1eb9f8de16f53bcfa5.js"></script>`;
            const resultHTML = htmlPluginData.html.replace(
              '</head>', `${script}</head>`
            );
            // 返回修改后的结果
            htmlPluginData.html = resultHTML;
          }
        );
      }
    );
  }
}