package com.missionlearningos

import android.app.Activity
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.WindowInsets
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.statusBarColor = Color.parseColor("#F5F1E8")
        window.navigationBarColor = Color.parseColor("#F5F1E8")
        window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR or View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR

        val webView = WebView(this)
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.allowFileAccess = true
        webView.settings.allowContentAccess = true
        webView.settings.useWideViewPort = false
        webView.settings.loadWithOverviewMode = false
        webView.settings.textZoom = 100

        // Android 15+ lays app content out behind system bars by default.
        // Apply the real insets so the header stays below the clock, signal and battery areas.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            webView.setOnApplyWindowInsetsListener { view, insets ->
                val bars = insets.getInsets(WindowInsets.Type.systemBars())
                view.setPadding(bars.left, bars.top, bars.right, bars.bottom)
                insets
            }
        }

        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView, url: String) {
                super.onPageFinished(view, url)
                view.evaluateJavascript(
                    """
                    (function(){
                      var logo=document.querySelector('.logo');
                      if(logo){
                        logo.innerHTML='<img src="file:///android_asset/src/mission-logo.svg" alt="Mission Learning OS" style="width:100%;height:100%;object-fit:cover;border-radius:10px;display:block">';
                        logo.style.background='#F8F6F0';
                        logo.style.display='block';
                        logo.style.padding='0';
                        logo.style.overflow='hidden';
                      }
                    })();
                    """.trimIndent(), null
                )
            }
        }
        webView.loadUrl("file:///android_asset/index.html")
        setContentView(webView)
    }
}
