# [Ride v6] Built-in variables

:warning: This is the documentation for the Standard Library version 6, which is currently available for [Stagenet](/en/blockchain/blockchain-network/) only. [Go to Mainnet version](/en/ride/variables/built-in-variables)

A **built-in variable** is a [variable](/en/ride/variables/) of the [Standard library](/en/ride/script/standard-library).

<table style="width:100%">
  <tr>
    <th align="left">Name</th>
    <th align="left">Description</th>
  </tr>
  <tr>
    <td>Buy</td>
    <td><a href="/en/blockchain/order">Order</a> type</td>
  </tr>
  <tr>
    <td>
      <ul>
        <li>CEILING</li>
        <li>DOWN</li>
        <li>FLOOR</li>
        <li>HALFEVEN</li>
        <li>HALFUP</li>
      </ul>
    </td>
    <td>
      <a href="/en/ride/functions/built-in-functions/math-functions">Rounding methods</a> used in the <a href="/en/ride/functions/built-in-functions/math-functions">math functions</a> <code>fraction</code>, <code>log</code>, <code>pow</code>
    </td>
  </tr>
  <tr>
    <td>height</td>
    <td><a href="/en/blockchain/glossary#b">Blockchain height</a> at the script execution time</td>
  </tr>
  <tr>
    <td>i<a id="i"></a></td>
    <td>For a <a href="/en/ride/v6/script/script-types/call-script">call script</a> only: the <a href="/en/ride/v6/structures/common-structures/invocation">Invocation</a> structure which contains fields of the <a href="/en/blockchain/transaction-type/invoke-expression-transaction">Invoke Expression transaction</a> that are available to the script</td>
  </tr>
  <tr>
    <td>lastBlock</td>
    <td>Information about the last <a href="/en/blockchain/block">block</a> of the blockchain at the script execution time</td>
  </tr>
  <tr>
    <td>nil</td>
    <td>Variable that contains an empty <a href="/en/ride/data-types/list">list.</a><br>The variable is used for creating lists. For example, instead of:<br>
<pre>
<code class=“lang-ride”>
    let a = [5,6]
</code>
</pre>
    you can write:
<pre>
<code class=“lang-ride”>
    let b = 5::6::nil
</code>
</pre>
      Lists are created using both methods. The first method is a syntactic sugar      
    </td>
  </tr>
  <tr>
    <td>
      <ul>
        <li>NOALG</li><li>MD5</li>
        <li>SHA1</li><li>SHA224</li>
        <li>SHA256</li><li>SHA384</li>
        <li>SHA512</li><li>SHA3224</li>
        <li>SHA3256</li><li>SHA3384</li>
        <li>SHA3512</li>
      </ul>
    </td>
    <td>
      Variables that are passed as the first parameter to the <a href="/en/ride/functions/built-in-functions/verification-functions">rsaVerify</a> function
    </td>
  </tr>
  <tr>
    <td>Sell</td>
    <td><a href="/en/blockchain/order">Order</a> type</td>
  </tr>
  <tr>
    <td>this</td>
    <td>• For a <a href="/en/ride/script/script-types/dapp-script">dApp script</a>, <a href="/en/ride/script/script-types/account-script">account script</a>, or <a href="/en/ride/v6/script/script-types/call-script">call script</a>: the <a href="/en/ride/structures/common-structures/address">Address</a> structure<br/>• For an <a href="/en/ride/script/script-types/asset-script">asset script</a>: the <a href="/en/ride/structures/common-structures/asset">Asset</a> structure</td>
  </tr>
  <tr>
    <td>9</td>
    <td>tx</td>
    <td><a href="/en/blockchain/transaction">Transaction</a> or <a href="/en/blockchain/order">order</a></td>
  </tr>
  <tr>
    <td>10</td>
    <td>unit</td>
    <td>Variable that contains an object of <a href="/en/ride/data-types/unit">Unit</a> type.<br><b>Example 1</b><br> the <code>deposit</code> function transfers 5 <a href="/en/blockchain/token/waves">WAVELETs</a> to the account, that <a href="/en/ride/functions/callable-function">called</a> this function.

<pre>
<code class=“lang-ride”>
{-# STDLIB_VERSION 6 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

@Callable(inv)
func deposit() = {
  (
    [
      # Transfer 5 WAVELETs to the inv.caller account
      # WAVES does not have a token ID, unit is specified instead
      ScriptTransfer(inv.caller, 5, unit) 
    ],
    unit
  )
}
</code>
</pre>

<b>Example 2</b><br>The <a href="/en/ride/functions/built-in-functions/blockchain-functions"><tt>assetInfo</tt></a> function requests information about the token by its ID. Next, the <code>isDefined</code> function checks that a token with this ID exists on the blockchain.
<pre>
<code class=“lang-ride”>
let asset = assetInfo(base58'8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS')
asset.isDefined()
</code>
</pre>

Instead of calling the <code>isDefined</code> function, you may use the equality with <code>unit</code>.
<pre>
<code class=“lang-ride”>
asset != unit
\# Expression asset != unit is equivalent to the expression token.isDefined()
</code>
</pre>
  </td>
  </tr>
</table>
