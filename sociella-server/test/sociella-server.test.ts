import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as SociellaServer from '../lib/sociella-server-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SociellaServer.SociellaServerStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
