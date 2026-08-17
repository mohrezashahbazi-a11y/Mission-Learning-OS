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

        // Android 15+ draws edge-to-edge for modern target SDKs. Keep the
        // web app below the real system bars instead of letting them overlap
        // the header/logo.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            webView.setOnApplyWindowInsetsListener { view, insets ->
                val bars = insets.getInsets(
                    WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars()
                )
                view.setPadding(0, bars.top, 0, bars.bottom)
                insets
            }
        }

        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView, url: String) {
                super.onPageFinished(view, url)
                view.evaluateJavascript(
                    """
                    (function(){
                      if(!document.getElementById('standalone-mobile-css')){
                        var l=document.createElement('link');
                        l.id='standalone-mobile-css';
                        l.rel='stylesheet';
                        l.href='file:///android_asset/src/standalone-mobile.css';
                        document.head.appendChild(l);
                      }

                      // Use a real inline SVG for the Mission OS tree mark.
                      // This is more reliable in Android WebView than a CSS data URI.
                      var logo=document.querySelector('.logo');
                      if(logo){
                        logo.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="28" height="28" aria-hidden="true"><g fill="none" stroke="#43583f" stroke-linecap="round" stroke-linejoin="round"><path stroke-width="6" d="M50 43v35M50 70c-7 9-15 12-23 13M50 70c7 9 15 12 23 13M50 78c-4 7-8 10-13 13M50 78c4 7 8 10 13 13"/><path stroke-width="5" d="M50 13c-11 0-20 7-22 17-9 1-16 8-16 17 0 10 8 18 18 18 3 0 6-1 9-2 4 6 10 9 17 9 7 0 13-3 17-9 3 1 6 2 9 2 10 0 18-8 18-18 0-9-7-16-16-17-2-10-11-17-22-17-4 0-8 1-12 3-4-2-8-3-12-3Z"/></g></svg>';
                        logo.style.display='grid';
                        logo.style.placeItems='center';
                        logo.style.overflow='hidden';
                      }
                    })();
                    """.trimIndent(),
                    null
                )
            }
        }

        webView.loadUrl("file:///android_asset/index.html")
        setContentView(webView)
    }
}
