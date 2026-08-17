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
        // Apply the actual system-bar insets so headers, controls and logos never collide with them.
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
                        logo.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="27" height="27" aria-hidden="true"><path d="M17 78 L36 57 L52 67 L79 34" fill="none" stroke="#78A58F" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="17" cy="78" r="6" fill="#78A58F"/><circle cx="36" cy="57" r="6" fill="#78A58F"/><circle cx="52" cy="67" r="6" fill="#78A58F"/><circle cx="79" cy="34" r="7" fill="#F2A65A"/><path d="M78 23v11H67" fill="none" stroke="#F2A65A" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                        logo.style.background='#0B1B2B';
                        logo.style.display='grid';
                        logo.style.placeItems='center';
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
