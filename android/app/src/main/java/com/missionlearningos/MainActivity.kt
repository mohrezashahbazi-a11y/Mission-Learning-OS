package com.missionlearningos

import android.app.Activity
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window.statusBarColor = Color.parseColor("#f5f1e8")
        window.navigationBarColor = Color.parseColor("#f5f1e8")
        window.decorView.systemUiVisibility =
            View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR or View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR

        val webView = WebView(this)
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.allowFileAccess = true
        webView.settings.allowContentAccess = true
        webView.settings.useWideViewPort = false
        webView.settings.loadWithOverviewMode = false
        webView.settings.textZoom = 100
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView, url: String) {
                super.onPageFinished(view, url)
                view.evaluateJavascript(
                    "(function(){if(document.getElementById('standalone-mobile-css'))return;" +
                    "var l=document.createElement('link');l.id='standalone-mobile-css';l.rel='stylesheet';" +
                    "l.href='file:///android_asset/src/standalone-mobile.css';document.head.appendChild(l);" +
                    "})();",
                    null
                )
            }
        }
        webView.loadUrl("file:///android_asset/index.html")
        setContentView(webView)
    }
}
