# API

The API provided for this project is from Sole Digital.
There is no API key needed.

The following API endpoint provides the data in XML file format.

```
https://www.soledigital.com.au/accesspack/UWS_data.asp
```

Calling the above API returns an XML data as follows:

```
<icons>
	<site>
		<name>UWS</name>
		<equipment></equipment>
		<site>
			<name>Kingswood</name>
			<equipment>
				<equipid>Epilog Fusion 40</equipid>
				<equiptype>laser</equiptype>
				<logs>
					<login>
						<timestamp>14/04/22 00:16:23</timestamp>
						<operator>069184D4</operator>
						<duration>0</duration>
					</login>
					<login>
						<timestamp>16/10/21 07:54:01</timestamp>
						<operator>A061A400</operator>
						<duration>180</duration>
					</login>
				</logs>
			</equipment>
		</site>
		<site>
			<name>Westmead</name>
			<equipment>
				<equipid>Epilog Fusion 40</equipid>
				<equiptype>laser</equiptype>
				<logs></logs>
			</equipment>
		</site>
		<site>
			<name>PEIH</name>
			<equipment></equipment>
		</site>
	</site>
</icons>
```
