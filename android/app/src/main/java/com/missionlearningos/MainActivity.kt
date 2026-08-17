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
                        logo.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-label="Mission Learning OS"><rect width="100" height="100" rx="24" fill="#F8F6F0"/><path fill="#0B2545" d="M14 69Q50 82 86 69L77 81Q50 90 23 81Z"/><path fill="none" stroke="#D3A83A" stroke-width="3" stroke-linecap="round" d="M23 67Q50 75 77 67M28 62Q50 68 72 62"/><path fill="#0B5D46" d="M49 69c-7-23-4-40 9-53 10-11 22-15 31-16-5 12-13 21-24 28 15-1 25 3 32 10-12 2-23 1-33-5 8 10 11 21 11 36z"/><path fill="#0B5D46" d="M49 69c-12-18-14-32-8-44 6-12 16-18 26-22-3 12-8 21-17 28 14-5 24-4 32-1-9 7-19 10-31 8 9 7 15 16 17 31z"/><path fill="#8FBF3F" d="M28 40c-8-6-11-12-9-18 7 1 12 5 15 11 0-7 2-12 7-17 4 6 5 12 2 18 5-5 10-8 16-9-1 7-5 12-11 15 7-1 13 1 18 5-6 5-13 6-20 3-7 2-13 0-18-3z"/><path fill="#8FBF3F" d="M68 29c1-7 5-12 11-15 2 6 0 11-4 16 6-4 12-4 18-2-3 6-8 9-15 10 6 2 10 6 13 12-7 1-13-2-17-7-6-2-10-6-6-14z"/><circle cx="45" cy="45" r="5" fill="#0B2545"/><circle cx="62" cy="33" r="5" fill="#0B2545"/><circle cx="75" cy="50" r="5" fill="#0B2545"/></svg>';
                        logo.style.background='#F8F6F0';
                        logo.style.border='1px solid #D8D1C4';
                        logo.style.borderRadius='50%';
                        logo.style.display='block';
                        logo.style.padding='0';
                        logo.style.overflow='hidden';
                        logo.style.boxShadow='0 5px 14px rgba(37,45,40,.12)';
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
